const teamTypes = ["SCHOOL", "CHURCH", "CORPORATE","TRAINING_CENTER", "OTHER"] as const;

export type TeamType = (typeof teamTypes)[number];

export function isValidTeamType(type: unknown): type is TeamType {
  return typeof type === "string" && teamTypes.includes(type as TeamType);
}
