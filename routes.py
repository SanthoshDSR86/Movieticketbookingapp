# routes.py
"""
API routes for the application.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import RestaurantSchema, MenuSchema, UserSchema, OrderSchema
from models import Restaurant, Menu, User, Order
from typing import List

restaurant_routes = APIRouter()
user_routes = APIRouter()
order_routes = APIRouter()

# Restaurant routes
@restaurant_routes.get("/restaurants/")
async def get_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(Restaurant).all()
    return [RestaurantSchema.from_orm(restaurant) for restaurant in restaurants]

@restaurant_routes.post("/restaurants/")
async def create_restaurant(restaurant: RestaurantSchema, db: Session = Depends(get_db)):
    new_restaurant = Restaurant(name=restaurant.name, address=restaurant.address, phone_number=restaurant.phone_number)
    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)
    return RestaurantSchema.from_orm(new_restaurant)

# User routes
@user_routes.get("/users/")
async def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [UserSchema.from_orm(user) for user in users]

@user_routes.post("/users/")
async def create_user(user: UserSchema, db: Session = Depends(get_db)):
    new_user = User(name=user.name, email=user.email, phone_number=user.phone_number)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserSchema.from_orm(new_user)

# Order routes
@order_routes.get("/orders/")
async def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    return [OrderSchema.from_orm(order) for order in orders]

@order_routes.post("/orders/")
async def create_order(order: OrderSchema, db: Session = Depends(get_db)):
    new_order = Order(user_id=order.user_id, menu_id=order.menu_id, status=order.status)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return OrderSchema.from_orm(new_order)