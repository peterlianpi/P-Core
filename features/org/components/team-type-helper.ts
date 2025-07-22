const teamTypes = ["school", "church", "business", "nonprofit"] as const;

export type TeamType = (typeof teamTypes)[number];

export function isValidTeamType(type: unknown): type is TeamType {
  return typeof type === "string" && teamTypes.includes(type as TeamType);
}
