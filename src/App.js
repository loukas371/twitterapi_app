import './App.css';
import JADSLogo from './logos/jads-logo.png'
import InfoModal from './components/infoModal'

import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

function App() {

  const [query, setQuery] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [user, setUser] = useState('');
  const [langs, setLangs] = useState([]);
  const [area, setArea] = useState('');
  const [max_tweets, setMaxTweets] = useState(200);
  const [manual, setManual] = useState(false);
  const [info, setInfo] = useState({ show: false, field: '' })


  useEffect(() => {
    let query = '';
    if (keywords.length > 0) {
      query = keywords.join(' ');
    }
    query += phrases.join(' ');
    if (user !== '') {
      query += ' from:' + user;
    }

    if (langs.length > 0) {
      query += ' (';
      for (let l of langs) {
        query += `lang:${l} OR `
      }
      query = query.slice(0, -4);
      query += ')';
    }

    if (area === 'Netherlands') {
      query += ' place_country:NL'
    } else if (area === 'Zeeland') {
      query += ' point_radius:[3.763 51.489528 40km]'
    }

    setQuery(query);
  }, [keywords, phrases, user, langs, area]);

  const executeQuery = () => {
    axios.get('http://localhost:5000/searchtwitter/' + max_tweets, { params: { query: query } }).then(res => {
      //response handling
      console.log(res.data);
      if (res.data.tweet_count === 0) {
        alert('No tweets matching the query parameters were retrieved');
      }
      else if (!res.data.tweet_count) {
        alert('Something went wrong: ' + res.data.detail + ' Check the browser console for more information ');
      }
      else {
        alert(res.data.tweet_count + ' tweets retrieved');
      }
    })
  }

  const resetQuery = () => {
    setQuery('');
    setKeywords([]);
    setPhrases([]);
    setLangs([]);
    setUser('');
    setArea('');
  }

  return (
    <div className="App">
      <h1 className='App-header'>Twitter API Query Builder</h1>
      <div className='App-body'>
        <Formik
          initialValues={{
            fromUser: '',
            keyword: '',
            phrase: '',
            lang: '',
            area: '',
          }}
          onSubmit={(values) => { console.log(values) }}
        >
          {f => {

            const addField = fieldName => {
              switch (fieldName) {
                case 'keyword':
                  setKeywords(prev => [...prev, f.values[fieldName]]);
                  f.setFieldValue(fieldName, '');
                  break;
                case 'phrase':
                  setPhrases(prev => [...prev, '"' + f.values[fieldName] + '"'])
                  f.setFieldValue(fieldName, '');
                  break;
                case 'fromUser':
                  setUser(f.values[fieldName]);
                  f.setFieldValue(fieldName, '');
                  break;
                case 'lang':
                  setLangs(prev => [...prev, f.values[fieldName]]);
                  f.setFieldValue(fieldName, '');
                  break;
                default:
                  break;
              }
            };

            const removeField = fieldName => {
              switch (fieldName) {
                case 'keyword':
                  setKeywords(prev => prev.filter((_, i) => i !== prev.length - 1));
                  f.setFieldValue(fieldName, '');
                  break;
                case 'phrase':
                  setPhrases(prev => prev.filter((_, i) => i !== prev.length - 1))
                  f.setFieldValue(fieldName, '');
                  break;
                case 'fromUser':
                  setUser('');
                  f.setFieldValue(fieldName, '');
                  break;
                case 'lang':
                  setLangs(prev => prev.filter((_, i) => i !== prev.length - 1));
                  f.setFieldValue(fieldName, '');
                  break;
                default:
                  break;
              }
            };

            return (
              <Form className='Query-form'>
                <InfoModal show={info.show} field={info.field} onClose={() => setInfo({ show: false, field: '' })} />
                <h5>Query</h5>
                <div style={{ marginBottom: 30, display: 'flex', flexDirection: 'column' }}>
                  <textarea style={{ width: 700, height: 80 }} value={query} disabled={!manual} onChange={e => setQuery(e.target.value)} />
                  <div style={{ display: 'flex' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: 3, marginBottom: 3 }}>
                        <label style={{ marginRight: 10 }}>Manual input</label>
                        <input type='checkbox' value={manual} onChange={() => setManual(prev => !prev)} />
                      </div>
                      <button type='button' className='btn btn-primary' onClick={executeQuery}>Execute</button>
                      <button type='button' style={{ marginLeft: 5 }} className='btn btn-secondary' onClick={resetQuery}>Reset</button>
                    </div>
                    <div className='instructions'>
                      <p>
                        This app will help you to make easy queries to the Twitter API. It utilized the recent search endpoint and will retrieve tweets up to
                        one week old. Below are some of the most common and useful parameters that you can add to your query.
                        </p>
                      <p>
                        Click the<span className="material-icons">&nbsp; help_outline</span> icon for help. After you become familiar with the query structure you can select
                        manual input and start typing your own powerful queries. For a full reference on how to build a query click &nbsp;
                        <a href='https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query' target="_blank" rel="noreferrer">here</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='formGroup'>
                  <label htmlFor='keyword' className='formLabel col-form-label'>Keyword
                    <button className='invis' type='button' onClick={() => setInfo({ show: true, field: 'keyword' })}>
                      <span className="material-icons">help_outline</span>
                    </button>
                  </label>
                  <Field
                    type='text'
                    name='keyword'
                    placeholder='add single keyword'
                    className='form-control'
                  />
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => addField('keyword')}
                  ><span className="material-icons">add</span></button>
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => removeField('keyword')}
                  ><span className="material-icons">remove</span></button>
                </div >
                <div className='formGroup'>
                  <label htmlFor='phrase' className='formLabel col-form-label'>Phrase
                    <button className='invis' type='button' onClick={() => setInfo({ show: true, field: 'phrase' })}>
                      <span className="material-icons">help_outline</span>
                    </button></label>
                  <Field
                    type='text'
                    name='phrase'
                    placeholder='add exact phrase'
                    className='form-control'
                  />
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => addField('phrase')}
                  ><span className="material-icons">add</span></button>
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => removeField('phrase')}
                  ><span className="material-icons">remove</span></button>
                </div >
                <div className='formGroup'>
                  <label htmlFor='lang' className='formLabel col-form-label'>Language
                    <button className='invis' type='button' onClick={() => setInfo({ show: true, field: 'lang' })}>
                      <span className="material-icons">help_outline</span>
                    </button></label>
                  <Field
                    type='text'
                    name='lang'
                    placeholder='specify language'
                    className='form-control'
                  />
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => addField('lang')}
                  ><span className="material-icons">add</span></button>
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => removeField('lang')}
                  ><span className="material-icons">remove</span></button>
                </div >
                <div className='formGroup'>
                  <label htmlFor='fromUser' className='formLabel col-form-label'>Limit user
                    <button className='invis' type='button' onClick={() => setInfo({ show: true, field: 'fromUser' })}>
                      <span className="material-icons">help_outline</span>
                    </button>
                  </label>
                  <Field
                    type='text'
                    name='fromUser'
                    placeholder='specify twitter user (optional)'
                    className='form-control'
                  />
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => addField('fromUser')}
                  ><span className="material-icons">add</span></button>
                  <button
                    type='button'
                    className='addButton btn btn-dark addButton'
                    onClick={() => removeField('fromUser')}
                  ><span className="material-icons">remove</span></button>
                </div>
                <div className='formGroup'>
                  <label htmlFor='maxTweets' className='formLabel col-form-label'>Limit tweets
                    <button className='invis' type='button' onClick={() => setInfo({ show: true, field: 'max_tweets' })}>
                      <span className="material-icons">help_outline</span>
                    </button>
                  </label>
                  <input
                    type='number'
                    name='maxTweets'
                    value={max_tweets}
                    onChange={e => setMaxTweets(e.target.value)}
                    className='form-control'
                  />
                </div>
                <div className='formGroup'>
                  <label htmlFor='area' className='formLabel col-form-label'>Area
                    <button className='invis' type='button' onClick={() => setInfo({ show: true, field: 'area' })}>
                      <span className="material-icons">help_outline</span>
                    </button></label>
                  <Field as='select' name='area' className='form-control' onChange={(e) => {
                    setArea(e.target.value)
                    f.setFieldValue('area', e.target.value)
                  }}>
                    <option value=''>None</option>
                    <option value='Zeeland'>Zeeland</option>
                    <option value='Netherlands'>Netherlands</option>
                  </Field>
                </div>
              </Form>
            )
          }}
        </Formik>

      </div>
      <div className='App-footer'>
        <img src={JADSLogo} alt='JADS logo' className='logos' />
      </div>
    </div>
  );
}

export default App;
