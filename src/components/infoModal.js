import React from 'react';
import styles from './infoModal.module.css'

const infoModal = (props) => {


    let content;
    switch (props.field) {
        case 'keyword':
            content = 'Type one keyword at a time and click the plus sign to add it to the query. Logic AND operator applies for all keywords (space in query)'
            break;
        case 'phrase':
            content = 'Type a phrase that needs to be exactly matched in the tweet. Logic AND operator applies between this and the other operators (space in query)';
            break;
        case 'lang':
            content = (<span>
                type a language code to filter tweets. Adding more languages is supported only with logic OR operator. For full list of codes refer &nbsp;
                <a href='https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query' target="_blank" rel="noreferrer">here</a> (scroll to lang: operator)
            </span>);
            break;
        case 'fromUser':
            content = 'Type the username of one twitter user if you wish to receive tweets solely from that account';
            break;
        case 'max_tweets':
            content = 'Type a limit for the maximum number of tweets that this query will save and retrieve. Minimum value is 50 and you may receive up to max + 50 tweets depending on the results'
            break;
        case 'area':
            content = 'IMPORTANT: This option only works with an Academic twitter dev account. Select the options if you wish to scope the tweets to that location'
            break;
        default:
            break;
    }

    if (props.show) {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h3><span className="material-icons">help_outline</span>&nbsp;Help</h3>
                    <div className={styles.message}>
                        {content}
                    </div>
                    <button type='button' onClick={props.onClose} className='btn btn-dark'>Got it!</button>
                </div>
            </div>
        );
    } else {
        return null;
    }

}

export default infoModal;