# schemas.py
"""
Pydantic schemas for request and response validation.
"""
from pydantic import BaseModel
from typing import Optional

class RestaurantSchema(BaseModel):
    id: Optional[int]
    name: str
    address: str
    phone_number: str

    class Config:
        orm_mode = True

class MenuSchema(BaseModel):
    id: Optional[int]
    restaurant_id: int
    name: str
    price: float

    class Config:
        orm_mode = True

class UserSchema(BaseModel):
    id: Optional[int]
    name: str
    email: str
    phone_number: str

    class Config:
        orm_mode = True

class OrderSchema(BaseModel):
    id: Optional[int]
    user_id: int
    menu_id: int
    status: str

    class Config:
        orm_mode = True