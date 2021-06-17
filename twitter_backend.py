from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import pandas as pd
import json
import os


app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


@app.route('/searchtwitter/<max_tweets>', methods=['GET']) 
def searchtwitter(max_tweets):
    max_tweets = int(max_tweets)
    query = request.args.get('query')
    print(query)

    #bearer token
    with open('token.txt', 'r') as file:
        bearer_token = file.read().replace('\n', '')


    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    payload= { 
        'query': query, 
        'tweet.fields': 'created_at,lang,conversation_id',
        'expansions': 'author_id,geo.place_id', 
        'user.fields': 'username',
        'place.fields': 'contained_within,country,country_code,name,place_type', 
        'max_results': 100}
    
    url = "https://api.twitter.com/2/tweets/search/recent"

    #in case of academic access change the url to this for full archive search
    #url = "https://api.twitter.com/2/tweets/search/all"

    tweet_count = 0
    isFirst = True

    while (tweet_count <= max_tweets and 'next_token' in payload.keys()) or isFirst:
        
        response = requests.request("GET", url, headers = headers, params = payload)
        data = response.json()


        if 'errors' in data.keys():
            return jsonify(data)

        data['query'] = query
        if 'data' in data:
            #save in csv: includes only tweet data
            df = pd.DataFrame.from_dict(data['data'])
            
            #insert the url as a column: the url for a tweet is just https://twitter.com/someone/status/<tweet_id>
            df['url'] = df.apply (lambda row: 'https://twitter.com/someone/status/' + str(row['id']), axis=1)
            addHeader = not os.path.exists('tweets.csv')
            df.to_csv('tweets.csv', mode='a', header=addHeader, index=False)
            #save in json: includes tweet and expanded objects
            if not os.path.exists('tweets.json'):
                history = []
                history.append(data)
                with open('tweets.json', 'w') as file:                
                    json.dump(history, file,  sort_keys=True, indent=3)
            else: 
                with open('tweets.json', 'r+') as file:
                    history= json.load(file)
                    history.append(data)
                    file.seek(0)
                    json.dump(history, file)
        
        isFirst = False
        tweet_count = tweet_count + data['meta']['result_count']
        print(tweet_count)
        if 'next_token' in data['meta'].keys():
            payload['next_token'] = data['meta']['next_token']
        else:
            payload.pop('next_token', None)
            #payload['next_token'] = None
    #response2 = jsonify(data)
    #response2=jsonify({'message': 'all good'})

    return jsonify({'tweet_count': tweet_count})


app.run(host='0.0.0.0', port=5000)

    