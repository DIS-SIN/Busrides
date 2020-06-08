import { useState } from 'react';
import styles from '../stylesheets/SortOptions.module.css';

export default function SortOptions(props) {

    function getValue(ev) {
        console.log(ev.target.value);
    }

    return (
        <div>
            <h2 className={styles.title}>{props.t["Sort By"]}</h2>
            <div className={styles.radioButtons} onChange={getValue}>
                <label className={styles.radioButton}>Most Popular
                    <input type="radio" value="Most Popular" name="sorting" defaultChecked/>
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.radioButton}>Recently Posted
                    <input type="radio" value="Recently Posted" name="sorting"/>
                    <span className={styles.checkmark}></span>
                </label>
            </div>
        </div>
    );
}