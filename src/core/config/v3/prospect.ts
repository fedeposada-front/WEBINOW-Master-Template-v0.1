/**
 * v0.3 pilot loader. Intentionally NOT imported by legacy v0.2 routes yet.
 * This module is allowed to coexist with src/config/site.ts until the route cutover gate.
 */
import { prospectSchema } from "./prospect.schema.ts";
import { southCoolingDraft } from "../../../sites/south-cooling/config.ts";

export const activeProspectV3 = prospectSchema.parse(southCoolingDraft);
