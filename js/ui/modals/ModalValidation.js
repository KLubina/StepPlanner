export function validateTargetSteps(targetSteps) {
  if (isNaN(targetSteps) || targetSteps < 0) {
    alert("Bitte gib eine gültige Schrittzahl ein!");
    return false;
  }
  return true;
}
