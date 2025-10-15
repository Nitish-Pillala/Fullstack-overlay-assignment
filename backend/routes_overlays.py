from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/overlaydb")
client = MongoClient(MONGO_URI)
db = client.get_default_database()
overlays = db.overlays

overlays_bp = Blueprint("overlays", __name__)

def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@overlays_bp.route("/api/overlays", methods=["GET"])
def list_overlays():
    stream_id = request.args.get("stream_id")
    query = {"stream_id": stream_id} if stream_id else {}
    docs = list(overlays.find(query))
    return jsonify([serialize(d) for d in docs]), 200

@overlays_bp.route("/api/overlays/<oid>", methods=["GET"])
def get_overlay(oid):
    doc = overlays.find_one({"_id": ObjectId(oid)})
    if not doc:
        return jsonify({"error": "not found"}), 404
    return jsonify(serialize(doc)), 200

@overlays_bp.route("/api/overlays", methods=["POST"])
def create_overlay():
    data = request.json
    if not data.get("stream_id") or not data.get("type"):
        return jsonify({"error": "missing fields"}), 400
    res = overlays.insert_one(data)
    data["_id"] = str(res.inserted_id)
    return jsonify(data), 201

@overlays_bp.route("/api/overlays/<oid>", methods=["PUT"])
def update_overlay(oid):
    data = request.json
    overlays.update_one({"_id": ObjectId(oid)}, {"$set": data})
    updated = overlays.find_one({"_id": ObjectId(oid)})
    return jsonify(serialize(updated)), 200

@overlays_bp.route("/api/overlays/<oid>", methods=["DELETE"])
def delete_overlay(oid):
    overlays.delete_one({"_id": ObjectId(oid)})
    return jsonify({"deleted": oid}), 200
