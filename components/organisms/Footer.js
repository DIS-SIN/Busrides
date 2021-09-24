import PropTypes from 'prop-types';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t } from '../../helpers/commonProps';
import styles from '../stylesheets/Footer.module.css';

export default function Footer(props) {
console.log(props.t);
    return (
        <footer id="wb-info">
            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.row}>
                        <span>{props.t["Busrides"]} © 2021&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                        <a href={props.t.getAboutDALink} target="_blank" rel="noopener">{props.t["What is the Digital Academy?"]}</a>
                    </p>
                    <a className={styles.row} href={props.t.getDATwitter} aria-label={props.t["Digital Academy Twitter"]} target="_blank" rel="noopener">
                        <IcomoonReact iconSet={iconSet} size={16} icon="twitter"/>
                    </a>
                    <a className={styles.row} href="https://da-an.us3.list-manage.com/subscribe?u=9e5810d743bf898c302d3c312&id=bbc8bab3e7" target="_blank" rel="noopener">{props.t["Subscribe to our newsletter"]}</a>
                </div>
            </div>
            <div className="landscape">
                <nav className="container wb-navcurr">
                    <h2 className="wb-inv">{props.t["about_government"]}</h2>
                    <ul className="list-unstyled colcount-sm-2 colcount-md-3">
                        <li><a href={props.t["Contact us URL"]}>{props.t["Contact us text"]}</a></li>
                        <li><a href={props.t["Departments and agencies URL"]}>{props.t["Departments and agencies text"]}</a></li>
                        <li><a href={props.t["Public service and military URL"]}>{props.t["Public service and military text"]}</a></li>
                        <li><a href={props.t["News URL"]}>{props.t["News text"]}</a></li>
                        <li><a href={props.t["Treaties laws and regulations URL"]}>{props.t["Treaties laws and regulations text"]}</a></li>
                        <li><a href={props.t["Government wide reporting URL"]}>{props.t["Government wide reporting text"]}</a></li>
                        <li><a href={props.t["Prime minister URL"]}>{props.t["Prime minister text"]}</a></li>
                        <li><a href={props.t["How government works URL"]}>{props.t["How government works text"]}</a></li>
                        <li><a href={props.t["Open government URL"]}>{props.t["Open government text"]}</a></li>
                    </ul>
                </nav>
            </div>
            <div className="brand">
                <div className="container">
                    <div className="row">
                        <nav className="col-md-9 col-lg-10 ftr-urlt-lnk">
                            <h2 className="wb-inv">{props.t["about_this_site"]}</h2>
                            <ul>
                                <li><a href={props.t["Social media URL"]}>{props.t["Social media text"]}</a></li>
                                <li><a href={props.t["Mobile applications URL"]}>{props.t["Mobile applications text"]}</a></li>
                                <li><a href={props.t["About canada.ca URL"]}>{props.t["About canada.ca text"]}</a></li>
                                <li><a href={props.t["Terms and conditions URL"]}>{props.t["Terms and conditions text"]}</a></li>
                                <li><a href={props.t["Privacy URL"]}>{props.t["Privacy text"]}</a></li>
                            </ul>
                        </nav>
                        <div className="col-xs-6 visible-sm visible-xs tofpg"> <a href="#wb-cont">{props.t["top_of_page"]} <span className="glyphicon glyphicon-chevron-up"></span></a> </div>
                        <div className="col-xs-6 col-md-3 col-lg-2 text-right"> <img src="/theme/GCWeb/assets/wmms-blk.svg" alt={props.t["symbol_of_the_government_of_canada"]} /> </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    t: cp_t.isRequired
};