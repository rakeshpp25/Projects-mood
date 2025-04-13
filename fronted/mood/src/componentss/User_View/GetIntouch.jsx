import React from 'react'
import styles from '../../css/User_view_css/getInTouch.module.css'
import contactImage from '../../images/contactImage.png'
function GetIntouch() {
  return (
    <>
    <div className={styles.getIntouchDiv} id="contact">
<div className={styles.image}>
<img src={contactImage} alt="contact-image" />
</div>
<div className={styles.contactOuter}>
<div className={styles.contactInner}>
<div className={styles.getIntouchTitle}>
<span>
      Get in touch
</span>
<p>
Feel free to contact us and we will get back to you as soon as it possible
</p>
</div>
<form action="" className={styles.inputNbutton}>
<div className={styles.inputs}>
<input type="text" placeholder='Name' className={styles.nameInput} />
<input type="text" placeholder='Email' className={styles.emailInput} />
<textarea name="" id=""  placeholder='How we can help ?' className={styles.messageBox}></textarea>
</div>
<button className={styles.send} type='submit'>Send</button>
</form>
</div>
</div>
    </div>
    </>
  )
}

export default GetIntouch