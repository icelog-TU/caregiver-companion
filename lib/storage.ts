"use client";

export interface JournalEntry {
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
  createdAt: string;
}

export interface Message {
  id: string;
  sender: "parent" | "caregiver";
  text: string;
  timestamp: string;
}

export function getJournalEntries(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("journal_entries");
  return data ? JSON.parse(data) : [];
}

export function saveJournalEntry(entry: JournalEntry): void {
  const entries = getJournalEntries();
  const existing = entries.findIndex((e) => e.id === entry.id);
  if (existing >= 0) {
    entries[existing] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem("journal_entries", JSON.stringify(entries));
}

export function deleteJournalEntry(id: string): void {
  const entries = getJournalEntries().filter((e) => e.id !== id);
  localStorage.setItem("journal_entries", JSON.stringify(entries));
}

export function getMessages(): Message[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("chat_messages");
  return data ? JSON.parse(data) : [];
}

export function saveMessage(message: Message): void {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem("chat_messages", JSON.stringify(messages));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
