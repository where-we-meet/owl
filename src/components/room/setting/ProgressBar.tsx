'use client';

import styles from './ProgressBar.module.css';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { nowStepInfo } from '@/utils/nowStepInfo';
import { Progress } from '@nextui-org/react';

const steps = [
  { name: '일정', path: 'pick-calendar', value: 0 },
  { name: '장소', path: 'pick-place', value: 50 },
  { name: '확정', path: 'confirm', value: 100 }
];

const ProgressBar = ({ basePath }: { basePath: string }) => {
  const path = usePathname();
  const router = useRouter();

  const { nowStepIndex } = nowStepInfo(path);

  const handleStepClick = (path: string) => {
    router.push(`${basePath}/${path}`);
  };

  return (
    <div className={styles.steps}>
      {steps.map((step, index) => (
        <div
          key={step.path}
          className={`${styles.step} ${index <= nowStepIndex && styles.active} `}
          onClick={() => handleStepClick(step.path)}
        >
          {step.name}
        </div>
      ))}

      <Progress
        className={styles.progressWrapper}
        color="primary"
        aria-label="Step"
        value={steps[nowStepIndex].value}
      />
    </div>
  );
};

export default ProgressBar;
