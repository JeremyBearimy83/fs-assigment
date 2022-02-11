
import json
from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.son import SON
from flask_cors import CORS


def makeObjectIDString(obj):
    obj['_id'] = str(obj['_id'])
    return obj


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config['MONGO_URI'] = 'mongodb://localhost:27017/friends'
    # var mongouri: string = `mongodb: //${process.env.DB_USER}: ${process.env.DB_PASS}@localhost: 27017/forms`
    mongo = PyMongo(app)

    friends_db = mongo.db.friends

    @app.route('/hello')
    def hello():
        return {"lol": "Hello world"}

    @app.route('/getSearch/<term>',  methods=["GET"])
    def getSearch(term):
        friends = []
        search_result = friends_db.find(
            {"name": {"$regex": term, '$options': 'i'}}).limit(4)

        for friend in search_result:
            friend = makeObjectIDString(friend)
            friends.append(friend)
        response = {}
        response["friends"] = friends
        response["prev_url"] = ""
        response["next_url"] = ""
        return jsonify(response)

    @app.route('/getFriends/<skip>', methods=['GET', 'OPTIONS'])
    def getFriends(skip):

        parsed_skip = int(skip)

        # dont hardcode limit as 4 here
        pipeline = [

            {"$sort": SON([("_id", -1)])},
            {"$skip": parsed_skip},
            {"$limit": 4}
        ]

        db_friends = friends_db.aggregate(pipeline)
        friends = []
        for friend in db_friends:
            friend = makeObjectIDString(friend)
            friends.append(friend)

        no_of_friends = len(friends)
        response = {}
        response["friends"] = friends
        response["prev_url"] = "" if parsed_skip < 4 else f"/getFriends/{parsed_skip-4}"
        response["next_url"] = "" if no_of_friends < 4 else f"/getFriends/{parsed_skip+4}"

        return jsonify(response)

    @app.route("/getSorted/<skip>",  methods=['GET'])
    def getSortedFriends(skip):
        parsed_skip = int(skip)
        pipeline = [
            {"$sort": SON([("favorite", -1), ("_id", -1)])},
            {"$skip": parsed_skip},
            {"$limit": 4}
        ]
        sorted_friends = friends_db.aggregate(pipeline)
        friends = []

        for friend in sorted_friends:
            friend = makeObjectIDString(friend)
            friends.append(friend)
        no_of_friends = len(friends)
        response = {}
        response["friends"] = friends
        response["prev_url"] = "" if parsed_skip < 4 else f"/getSorted/{parsed_skip-4}"
        response["next_url"] = "" if no_of_friends < 4 else f"/getSorted/{parsed_skip+4}"

        return jsonify(response)

    @app.route('/addFriend', methods=['POST'])
    def addFriend():
        new_friend = request.json
        friends_db.insert_one(new_friend)
        new_friend = makeObjectIDString(new_friend)
        return new_friend

    @app.route('/toggleFav/<id>', methods=["PUT"])
    def toggleFav(id):
        foundling = friends_db.find_one(
            {"id": id}
        )
        friends_db.find_one_and_update(
            {"id": id},
            {"$set": {"favorite": not foundling["favorite"]}}
        )
        return "Updated"

    @app.route('/deleteFriend/<id>', methods=["DELETE"])
    def deleteFriend(id):
        friends_db.delete_one(
            {"id": id}
        )
        return "deleted"

    return app
