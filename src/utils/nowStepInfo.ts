export const nowStepInfo = (path: string) => {
  const steps = [
    { name: '일정', path: 'pick-calendar' },
    { name: '장소', path: 'pick-place' },
    { name: '확정', path: 'confirm' }
  ];
  const nowPath = path.split('/').pop();
  const nowStepIndex = steps.findIndex((step) => step.path === nowPath);
  return { nowPath, nowStepIndex };
};
