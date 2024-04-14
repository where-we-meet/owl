import PaypalMark from './PaypalMark';
import styles from './PayPalDonate.module.css';

const PayPalDonate = () => {
  return (
    <a target="_blank" className={styles.paypal} href="https://paypal.me/owllink">
      <PaypalMark />
      <span>개발자 응원하기</span>
    </a>
  );
};

export default PayPalDonate;
