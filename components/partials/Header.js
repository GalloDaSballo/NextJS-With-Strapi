import { useRouter } from 'next/router'
import styles from '../../styles/Header.module.css'

export default () => {
    const router = useRouter()
    console.log("router", router)

    const isHome = router.pathname === '/'

    const goBack = (e) => {
        e.preventDefault()
        router.back()
    }

    return(
        <nav className={styles.nav}>
            <div className={styles.back}>
                {!isHome && (
                    <a onClick={goBack}>
                        {'<'} Go Back
                    </a>
                )}
            </div>
            <div className={styles.masthead}>
                <h1>The E-Commerce</h1>
            </div>

        </nav>
    )

}