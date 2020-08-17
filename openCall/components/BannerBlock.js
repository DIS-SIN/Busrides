import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { cp_children } from '../../helpers/commonProps';
import styles from './BannerBlock.module.css';

export default function BannerBlock(props) {

    return (
        <div className={styles.bannerBlock} style={props.colors}>
            <div className={styles.content}>
                <div className={styles.markdown}>
                    <ReactMarkdown source={props.markdown}></ReactMarkdown>
                    {props.children}
                </div>
                {props.image ?
                    <img src={props.image.src} alt={props.image.altText}/>
                : undefined}
            </div>
        </div>
    );
}

BannerBlock.propTypes = {
    children: cp_children,
    colors: PropTypes.shape({
        backgroundColor: PropTypes.string,
        color: PropTypes.string
    }),
    image: PropTypes.shape({
        altText: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    }),
    markdown: PropTypes.string
};