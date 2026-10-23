import s from './Mocks.module.css';

export function MfeMock() {
  return (
    <div className={s.mfe}>
      <div style={{ gridColumn: '1/3', borderColor: '#16a34a' }}>shell · header + routing <small style={{ float: 'right' }}>host</small></div>
      <div style={{ borderColor: '#ff4d00' }}>account<small>remote</small></div>
      <div style={{ borderColor: '#6d28d9' }}>storefront / checkout<small>remote · loaded at runtime</small></div>
    </div>
  );
}
