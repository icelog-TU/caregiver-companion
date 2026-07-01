"use client";

import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, FAMILY_ID } from "./firebase";
import { rules as defaultRules } from "@/data/rules";

export type Role = "owner" | "caregiver" | "family";

const familyRef = () => doc(db, "families", FAMILY_ID);
const memberRef = (uid: string) => doc(db, "families", FAMILY_ID, "members", uid);
const codeRef = (code: string) => doc(db, "families", FAMILY_ID, "codeIndex", code);

export async function bootstrapOwner(uid: string): Promise<void> {
  // The family doc isn't readable until a member doc exists, so claim both
  // by writing them directly rather than reading first. Security rules reject
  // the family write for anyone but the original owner and reject the member
  // write for anyone who isn't that same uid, so this stays safe for repeat
  // logins and for non-owners who reach this code path by mistake.
  try {
    await setDoc(familyRef(), { ownerUid: uid, createdAt: serverTimestamp() });
  } catch {
    // Family already belongs to someone else (or to this uid already) - ignore.
  }
  try {
    await setDoc(memberRef(uid), { role: "owner", joinedAt: serverTimestamp() });
  } catch {
    // Not the legitimate owner of this family - stop, do not seed data.
    return;
  }
  const existingRules = await getDocs(collection(db, "families", FAMILY_ID, "rules"));
  if (existingRules.empty) {
    await Promise.all(
      defaultRules.map((rule, index) =>
        setDoc(doc(db, "families", FAMILY_ID, "rules", rule.id), {
          category: rule.category,
          categoryId: rule.categoryId,
          zh: rule.zh,
          id_lang: rule.id_lang,
          order: index,
        })
      )
    );
  }
}

export async function fetchRole(uid: string): Promise<Role | null> {
  const snap = await getDoc(memberRef(uid));
  return snap.exists() ? (snap.data().role as Role) : null;
}

export async function joinWithCode(uid: string, code: string): Promise<Role> {
  const codeSnap = await getDoc(codeRef(code));
  if (!codeSnap.exists()) throw new Error("INVALID_CODE");
  const role = codeSnap.data().role as Role;
  await setDoc(memberRef(uid), { role, joinedAt: serverTimestamp(), codeUsed: code });
  return role;
}

export async function getCodes(): Promise<{ caregiverCode?: string; familyCode?: string }> {
  const snap = await getDoc(familyRef());
  const data = snap.data() as { caregiverCode?: string; familyCode?: string } | undefined;
  return { caregiverCode: data?.caregiverCode, familyCode: data?.familyCode };
}

export async function regenerateCodes(): Promise<{ caregiverCode: string; familyCode: string }> {
  const gen = () => Math.random().toString(36).slice(2, 8).toUpperCase();
  const { caregiverCode: oldCaregiver, familyCode: oldFamily } = await getCodes();
  const caregiverCode = gen();
  const familyCode = gen();
  if (oldCaregiver) await deleteDoc(codeRef(oldCaregiver));
  if (oldFamily) await deleteDoc(codeRef(oldFamily));
  await setDoc(codeRef(caregiverCode), { role: "caregiver", createdAt: serverTimestamp() });
  await setDoc(codeRef(familyCode), { role: "family", createdAt: serverTimestamp() });
  await updateDoc(familyRef(), { caregiverCode, familyCode });
  return { caregiverCode, familyCode };
}

export interface FamilyRule {
  id: string;
  category: string;
  categoryId: string;
  zh: string;
  id_lang: string;
  order: number;
}

export function watchRules(cb: (rules: FamilyRule[]) => void) {
  const q = query(collection(db, "families", FAMILY_ID, "rules"), orderBy("order"));
  return onSnapshot(q, (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<FamilyRule, "id">) })))
  );
}

export async function addRule(rule: Omit<FamilyRule, "id">): Promise<void> {
  await addDoc(collection(db, "families", FAMILY_ID, "rules"), rule);
}

export async function updateRule(id: string, data: Partial<Omit<FamilyRule, "id">>): Promise<void> {
  await updateDoc(doc(db, "families", FAMILY_ID, "rules", id), data);
}

export async function deleteRule(id: string): Promise<void> {
  await deleteDoc(doc(db, "families", FAMILY_ID, "rules", id));
}

export interface FamilyJournalEntry {
  id: string;
  date: string;
  lunch: string;
  dinner: string;
  play: string;
  kitchenClean: boolean;
  livingRoomClean: boolean;
  linlinBathroomClean: boolean;
  ownBathroomClean: boolean;
  notes: string;
  createdByUid: string;
  createdAt: string;
}

export function watchJournal(cb: (entries: FamilyJournalEntry[]) => void) {
  const q = query(collection(db, "families", FAMILY_ID, "journal"), orderBy("date", "desc"));
  return onSnapshot(q, (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<FamilyJournalEntry, "id">) })))
  );
}

export async function addJournalEntry(
  entry: Omit<FamilyJournalEntry, "id" | "createdAt">
): Promise<void> {
  await addDoc(collection(db, "families", FAMILY_ID, "journal"), {
    ...entry,
    createdAt: new Date().toISOString(),
  });
}

export async function deleteJournalEntry(id: string): Promise<void> {
  await deleteDoc(doc(db, "families", FAMILY_ID, "journal", id));
}

export interface FamilyMessage {
  id: string;
  text: string;
  senderUid: string;
  senderRole: Role;
  createdAt: string;
}

export function watchMessages(cb: (messages: FamilyMessage[]) => void) {
  const q = query(collection(db, "families", FAMILY_ID, "messages"), orderBy("createdAt"));
  return onSnapshot(q, (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<FamilyMessage, "id">) })))
  );
}

export async function sendMessage(
  message: Omit<FamilyMessage, "id" | "createdAt">
): Promise<void> {
  await addDoc(collection(db, "families", FAMILY_ID, "messages"), {
    ...message,
    createdAt: new Date().toISOString(),
  });
}
