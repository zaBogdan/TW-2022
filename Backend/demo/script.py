import requests
from uuid import uuid4
import json
import time

API_KEY = "1995c298712f4e1fb8c86bd80c5b2aa0"
DOMAINID = "62b1bc385eb915182a1c2ec4"
URL = "https://tw-api.pground.io/api"
EVENT_MAPPING = dict()
HEADERS = {
    'X-GAMEIFY-KEY': API_KEY
}


def getEventMapping() -> dict:
    """
    Get the event mapping from the server.
    """
    events = requests.get(URL+"/domain/event/"+DOMAINID, headers=HEADERS).json()['data']['events']
    mapping = dict()
    for event in events:
        mapping[event['name']] = event['_id']
    return mapping

def registerEvent(event: str, gameifyId: str):
    """
    Mock an event to the server.
    """
    headers = {
        'X-GAMEIFY-KEY': API_KEY,
        'Content-type': 'application/json'
    }
    data = {
        "event": EVENT_MAPPING[event],
        "listenerId": gameifyId,
    }
    resp = requests.post("{}/domain/listen/{}".format(URL, DOMAINID), headers=headers, data=json.dumps(data)).json()
    print(resp['message'])

def getUserRewards(user: str):
    """
    Get the rewards for the user.
    """
    # here we should have some logic for the post, nothing to interesting
    resp = requests.get("{}/domain/user/info/{}".format(URL, user['gameifyId']), headers=HEADERS).json()
    return resp['data']['user']


# ----------------------------------------------------------------------------------------------------------------------

def addNewPost(post: str, user: str):
    """
    Add a new post to the server.
    """
    # here we should have some logic for the post, nothing to interesting

    registerEvent("posts", user['gameifyId'])

def likePost(post: str, user: str):
    """
    Add a new post to the server.
    """
    # here we should have some logic for the post, nothing to interesting

    registerEvent("likes", user['gameifyId'])

def commentPost(post: str, user: str):
    """
    Add a new post to the server.
    """
    # here we should have some logic for the post, nothing to interesting

    registerEvent("comments", user['gameifyId'])

def sharePost(post: str, user: str):
    """
    Add a new post to the server.
    """
    # here we should have some logic for the post, nothing to interesting

    registerEvent("shares", user['gameifyId'])


def generateOver10Posts():
    user = {
        'name': 'zaBogdan',
        'gameifyId': str(uuid4()) #'20c2a5d7-7a11-4ee2-b005-0798e88cdf6f'
    }

    # Trying to generate 
    print('[+] Trying to get achievemnt \'Over 10 Posts\' for {}'.format(user['name']))
    for i in range(0,11):
        addNewPost('Nemurirea sufletului {}'.format(i), user);

    print('[=] Waiting 3 seconds to make sure we give evaluator enough time')
    time.sleep(4);
    userInfo = getUserRewards(user)
    print(json.dumps(userInfo, indent=2))

def generatePopularRule():
    user = {
        'name': 'Mr. Popular',
        'gameifyId': str(uuid4())
    }

    # Trying to generate 
    print('[+] Trying to get rank \'PopularRule\' for {}'.format(user['name']))
    for i in range(0,21):
        addNewPost('Nemurirea sufletului {}'.format(i), user);

    for i in range(0,10):
        sharePost('Nemurirea sufletului {}'.format(i), user);

    print('[=] Waiting 3 seconds to make sure we give evaluator enough time')
    time.sleep(4);
    userInfo = getUserRewards(user)
    print(json.dumps(userInfo, indent=2))

if __name__ == '__main__':
    EVENT_MAPPING = getEventMapping()
    print(EVENT_MAPPING)
    generatePopularRule()
