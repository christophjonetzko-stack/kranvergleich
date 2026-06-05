// Shared lead-dispatch constants. Single source of truth so the firm-dispatch
// cap stays identical across the write path (/api/leads auto_select_nearest)
// and the read-only preview (/api/providers/count). Keeping it in lib/ (not
// exported from a route) avoids coupling the lightweight count endpoint to the
// leads route's heavy dependency graph (Resend, dns, zod, libphonenumber).

/** Max number of firms a single lead is dispatched to / previewed for. The
 *  "N Anbieter" shown on the recommendation screen must equal the N actually
 *  contacted on submit — both derive this value from here. */
export const MAX_COMPANY_IDS = 10
