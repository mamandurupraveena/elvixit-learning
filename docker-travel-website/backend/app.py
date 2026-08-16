from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


# ==========================================
# Database
# ==========================================

DATABASE = "travelgo.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            destination TEXT NOT NULL,
            travel_date TEXT NOT NULL,
            people INTEGER NOT NULL
        )
    """)

    conn.commit()
    conn.close()


# ==========================================
# Destinations
# ==========================================

destinations = [
    {
        "id": 1,
        "name": "Kerala",
        "country": "India",
        "description": "God's Own Country",
        "price": 15000,
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 2,
        "name": "Dubai",
        "country": "UAE",
        "description": "City of Gold",
        "price": 35000,
        "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 3,
        "name": "Paris",
        "country": "France",
        "description": "City of Love",
        "price": 60000,
        "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": 4,
        "name": "Bali",
        "country": "Indonesia",
        "description": "Island Paradise",
        "price": 28000,
        "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
    }
]


# ==========================================
# Home
# ==========================================

@app.route("/")
def home():

    return jsonify({
        "message": "TravelGo API is running",
        "status": "success"
    })


# ==========================================
# Get destinations
# ==========================================

@app.route("/api/destinations")
def get_destinations():

    return jsonify(destinations)


# ==========================================
# Search destinations
# ==========================================

@app.route("/api/search")
def search_destinations():

    search = request.args.get(
        "destination",
        ""
    ).strip().lower()

    results = [
        destination
        for destination in destinations
        if search in destination["name"].lower()
        or search in destination["country"].lower()
    ]

    return jsonify({
        "success": True,
        "count": len(results),
        "results": results
    })


# ==========================================
# Create booking
# ==========================================

@app.route("/api/bookings", methods=["POST"])
def create_booking():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No booking data received"
        }), 400


    required_fields = [
        "name",
        "email",
        "destination",
        "travelDate",
        "people"
    ]


    for field in required_fields:

        if not data.get(field):

            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400


    try:

        people = int(data["people"])

        if people < 1:
            raise ValueError

    except (ValueError, TypeError):

        return jsonify({
            "success": False,
            "message": "People must be at least 1"
        }), 400


    conn = get_db()

    cursor = conn.execute("""
        INSERT INTO bookings
        (name, email, destination, travel_date, people)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["name"],
        data["email"],
        data["destination"],
        data["travelDate"],
        people
    ))

    booking_id = cursor.lastrowid

    conn.commit()
    conn.close()


    return jsonify({
        "success": True,
        "message": "Booking created successfully",
        "booking": {
            "id": booking_id,
            "name": data["name"],
            "email": data["email"],
            "destination": data["destination"],
            "travelDate": data["travelDate"],
            "people": people
        }
    }), 201


# ==========================================
# Get all bookings
# ==========================================

@app.route("/api/bookings")
def get_bookings():


    conn = get_db()

    rows = conn.execute("""
        SELECT
            id,
            name,
            email,
            destination,
            travel_date,
            people
        FROM bookings
        ORDER BY id DESC
    """).fetchall()

    conn.close()


    bookings = []

    for row in rows:

        bookings.append({
            "id": row["id"],
            "name": row["name"],
            "email": row["email"],
            "destination": row["destination"],
            "travelDate": row["travel_date"],
            "people": row["people"]
        })


    return jsonify({
        "success": True,
        "count": len(bookings),
        "bookings": bookings
    })
# ==========================================
# Delete booking
# ==========================================

@app.route("/api/bookings/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):

    conn = get_db()

    cursor = conn.execute(
        "DELETE FROM bookings WHERE id = ?",
        (booking_id,)
    )

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({
            "success": False,
            "message": "Booking not found"
        }), 404

    return jsonify({
        "success": True,
        "message": "Booking deleted successfully"
    })

# ==========================================
# Update booking
# ==========================================

@app.route("/api/bookings/<int:booking_id>", methods=["PUT"])
def update_booking(booking_id):

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No booking data received"
        }), 400

    required_fields = [
        "name",
        "email",
        "destination",
        "travelDate",
        "people"
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    try:
        people = int(data["people"])

        if people < 1:
            raise ValueError

    except (ValueError, TypeError):
        return jsonify({
            "success": False,
            "message": "People must be at least 1"
        }), 400

    conn = get_db()

    cursor = conn.execute("""
        UPDATE bookings
        SET
            name = ?,
            email = ?,
            destination = ?,
            travel_date = ?,
            people = ?
        WHERE id = ?
    """, (
        data["name"],
        data["email"],
        data["destination"],
        data["travelDate"],
        people,
        booking_id
    ))

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({
            "success": False,
            "message": "Booking not found"
        }), 404

    return jsonify({
        "success": True,
        "message": "Booking updated successfully"
    })

# ==========================================
# Start application
# ==========================================

if __name__ == "__main__":

    init_db()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )