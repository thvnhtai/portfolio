import s from './BadgeFallback.module.css';

export function BadgeFallback() {
  return (
    <div className={s.wrap}>
      <div className={s.card}>
        <div className={s.top} />
        <img className={s.photo} src={`${import.meta.env.BASE_URL}img/profile.jpg`} alt="Tai Nguyen" />
        <p className={s.name}>TAI NGUYEN</p>
        <p className={s.role}>Fullstack Engineer</p>
        <p className={s.meta}>HCMC · GMT+7 · ex-GRAB</p>
      </div>
    </div>
  );
}
