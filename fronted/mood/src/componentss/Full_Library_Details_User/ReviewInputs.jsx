import React from 'react'
import styles from  '../../css/ReviewInputs.module.css'
import { StarIcon } from '../Svgs'

function ReviewInputs() {
  return (
    <>
    <div className={styles.SubmitReviewOuterDiv}>
<div className={styles.titleNStar}>
<div className={styles.ThanksForReviewTitle}>
Thank You For Your Review
</div>
<div className={styles.allStars}>
{
      [1 , 2 , 3 , 4, 5].map(()=>(
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" fill="none">
            <path d="M33.7657 42.3804C32.2715 43.4979 22.6839 36.4143 20.8477 36.3988C19.0114 36.3833 9.31588 43.304 7.83909 42.1614C6.3623 41.0188 9.83416 29.2833 9.28088 27.4501C8.7276 25.617 -0.55528 18.1014 0.0262052 16.2779C0.607819 14.4543 12.3411 14.2849 13.8353 13.1674C15.3296 12.0501 19.2881 0.484581 21.1244 0.500015C22.9605 0.515584 26.7402 12.1465 28.217 13.289C29.6938 14.4315 41.4231 14.7992 41.9765 16.6323C42.5298 18.4654 33.1324 25.8232 32.5508 27.6468C31.9693 29.4703 35.2599 41.263 33.7657 42.3804Z" fill="#FABC3F"/>
            </svg>
      ))
}
</div>
<div className={styles.ReviewInWord}>
Excellent
</div>
</div>
<div className={styles.inputsBoxes}>
<input type="text" placeholder='Review Title' />
<textarea name="" id="" placeholder='Review Descrption'></textarea>
</div>
<button className={styles.SubmitReviewButton} type='submit'>Submit Review</button>
    </div>
    
    </>
  )
}

export default ReviewInputs