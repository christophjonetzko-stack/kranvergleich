'use client'

import { useEffect } from 'react'

// Records the pathname of the FIRST page mounted in this browser session into
// sessionStorage so any later /api/leads submission can attribute the lead to
// its true entry point, distinguishing a deeplink expert (lands on
// /raupenkran-mieten/hamburg, fills form there) from a generalist (lands on
// "/", browses around, submits later).
//
// sessionStorage scope is exactly what we want: persists across in-session
// navigation, dies on tab close. Cookie-free, no DSGVO consent needed (purely
// local, never leaves the device until the user explicitly submits a form).
//
// Mounted once at layout level so every route is covered, including
// /anbieter/[slug] profile pages where there is no PageEventTracker.

export const SESSION_ENTRY_KEY = 'kv_entry_path_v1'

export function SessionEntryRecorder() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (window.sessionStorage.getItem(SESSION_ENTRY_KEY)) return
      // Pathname only, no query string, no fragment. Keeps the value below
      // the 120-char ceiling enforced server-side and avoids accidentally
      // leaking ?email=… style values through to the leads table.
      window.sessionStorage.setItem(SESSION_ENTRY_KEY, window.location.pathname)
    } catch {
      // sessionStorage disabled (private mode in some browsers, storage
      // quota), non-fatal; entry_path will be null on the lead row.
    }
  }, [])
  return null
}

export function getSessionEntryPath(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.sessionStorage.getItem(SESSION_ENTRY_KEY)
  } catch {
    return null
  }
}
