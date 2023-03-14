import PropTypes from 'prop-types';
import IcomoonReact from "icomoon-react";
import iconSet from "../icons/selection.json";
import { cp_t } from '../../helpers/commonProps';
import styles from '../stylesheets/Footer.module.css';

export default function Footer(props) {
    return (
        <footer id="wb-info">
            {props.children}
            <div id="BottomModifiedDate" className="container pagedetails">
                <dl id="wb-dtmd">
                    <dt>{props.t["Date modified"]}</dt>
                    <dd><time property="dateModified">2023-03-14</time></dd>
                </dl>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.row}>
                        <span>{props.t["Busrides"]} © 2023&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                        <a href={props.t.getAboutDALink} target="_blank" rel="noopener">{props.t["What is the Digital Academy?"]}</a>
                    </p>
                    <a className={styles.row} href={props.t.getDATwitter} aria-label={props.t["Digital Academy Twitter"]} target="_blank" rel="noopener">
                        <IcomoonReact iconSet={iconSet} size={16} icon="twitter"/>
                    </a>
                    <a className={styles.row} href={props.t["NewsletterLink"]} target="_blank" rel="noopener">{props.t["Subscribe to our newsletter"]}</a>
                </div>
            </div>

            <h2 className="wb-inv">{props.t["About this site"]}</h2>

            <div className="gc-main-footer">
                <div className="container">
                    <nav>
                        <h3>{props.t["Government of Canada"]}</h3>
                        <ul className="list-col-xs-1 list-col-sm-2 list-col-md-3"><li><a href={props.t["contact-url"]}>{props.t["All contacts"]}</a></li>
                            <li><a href={props.t["dept-url"]}>{props.t["Departments and agencies"]}</a></li>
                            <li><a href={props.t["system-url"]}>{props.t["About government"]}</a></li>
                        </ul>
                        <h4><span className="wb-inv">{props.t["Themes and topics"]}</span></h4>
                        <ul className="list-unstyled colcount-sm-2 colcount-md-3"><li><a href={props.t["jobs-url"]}>{props.t["Jobs"]}</a></li>
                            <li><a href={props.t["immigration-citizenship-url"]}>{props.t["Immigration and citizenship"]}</a></li>
                            <li><a href={props.t["travel-url"]}>{props.t["Travel and tourism"]}</a></li>
                            <li><a href={props.t["business-url"]}>{props.t["Business"]}</a></li>
                            <li><a href={props.t["benefits-url"]}>{props.t["Benefits"]}</a></li>
                            <li><a href={props.t["health-url"]}>{props.t["Health"]}</a></li>
                            <li><a href={props.t["taxes-url"]}>{props.t["Taxes"]}</a></li>
                            <li><a href={props.t["environment-url"]}>{props.t["Environment and natural resources"]}</a></li>
                            <li><a href={props.t["defence-url"]}>{props.t["National security and defence"]}</a></li>
                            <li><a href={props.t["culture-url"]}>{props.t["Culture, history and sport"]}</a></li>
                            <li><a href={props.t["policing-url"]}>{props.t["Policing, justice and emergencies"]}</a></li>
                            <li><a href={props.t["transport-url"]}>{props.t["Transport and infrastructure"]}</a></li>
                            <li><a href={props.t["world-monde-url"]}>{props.t["Canada and the world"]}</a></li>
                            <li><a href={props.t["finance-url"]}>{props.t["Money and finance"]}</a></li>
                            <li><a href={props.t["science-url"]}>{props.t["Science and innovation"]}</a></li>
                            <li><a href={props.t["indigenous-peoples-url"]}>{props.t["Indigenous peoples"]}</a></li>
                            <li><a href={props.t["veterans-url"]}>{props.t["Veterans and military"]}</a></li>
                            <li><a href={props.t["youth-url"]}>{props.t["Youth"]}</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="gc-sub-footer">
                <div className="container d-flex align-items-center">
                    <nav>
                        <h3 className="wb-inv">{props.t["Government of Canada Corporate"]}</h3>
                        <ul>
                            <li><a href={props.t["social-url"]}>{props.t["Social media"]}</a></li>
                            <li><a href={props.t["mobile-url"]}>{props.t["Mobile applications"]}</a></li>
                            <li><a href={props.t["about-url"]}>{props.t["About Canada.ca"]}</a></li>
                            <li><a href={props.t["terms-url"]}>{props.t["Terms and conditions"]}</a></li>
                            <li><a href={props.t["privacy-url"]}>{props.t["Privacy"]}</a></li></ul>
                    </nav>
                    <div className="wtrmrk align-self-end">
                        <img src="https://wet-boew.github.io/themes-dist/GCWeb/GCWeb/assets/wmms-blk.svg" alt={props.t["Symbol of the Government of Canada"]} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    t: cp_t.isRequired
};
