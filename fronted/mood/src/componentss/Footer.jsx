import React from 'react'
import styles from '../css/footer.module.css'
import { ContactIcon, CopyrightIcon, EmailIcon } from './Svgs'

function Footer() {
  return (
    <>
    <div className={styles.OuterFooterDiv}>
<div className={styles.InnerOuterDiv}>
<span className={styles.mood}>
MOOD
</span>
<div className={styles.copyrightNyear}>
<span className={styles.copyright}>
      Copyright
</span>
<span className={styles.copyrightIcon}>
<CopyrightIcon/>
</span>
<span className={styles.year}>
Mood 2025
</span>
</div>
<div className={styles.ContactNEmail}>
<div className={styles.ContactNIcon}>
<span className={styles.contactIcon}>
<ContactIcon/>
</span>
<span className={styles.ContactNumber}>
7232948707
</span>
</div>
<div className={styles.EmailNicon}>
<span className={styles.EmailIcon}>
<EmailIcon/>
</span>
<span className={styles.Email}>
milliodream584@gmail.com
</span>
</div>
</div>
</div>
    </div>
    </>
  )
}

export default Footer