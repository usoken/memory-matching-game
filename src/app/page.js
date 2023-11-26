import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>▀▄▀▄▀▄🄼🄴🄼🄾🅁🅈 🄶🄰🄼🄴▀▄▀▄▀▄</h1>
      <div className={styles.center}>
        <div className={styles.grid}>
          <img src="/Blanche_NH_Villager_Icon.png" />
          <img src="/Fang_NH_Villager_Icon.png" />
          <img src="/Gala_NH_Villager_Icon.png" />
          <img src="/Julian_NH_Villager_Icon.png" />
          <img src="/June_NH_Villager_Icon.png" />
          <img src="/Marshal_NH_Villager_Icon.png" />
        </div>
      </div>
      <Link className={styles.button} href="/gameboard">·.★·.·´¯`·.·★ 🅿🅻🅰🆈 ★·.·´¯`·.·★.·</Link>
      <footer className={styles.footer}>
        <p>The icons and images used in this game are the property of Nintendo Co., Ltd. and are protected by copyright laws. I do not own the copyrights to these images and is using them solely for educational purposes under the principles of fair use.</p>
        <p>Background Music:"Dreamers" by Mixaund. Licensed under Creative Commons: Attribution-NonCommercial [CC BY-NC], Link to Mixaund's website: https://mixaund.bandcamp.com/track/dreamers-3</p>
      </footer>
    </main>
  )
}
