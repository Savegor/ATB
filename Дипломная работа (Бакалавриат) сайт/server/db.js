import { Sequelize } from "sequelize"
import dotenv from 'dotenv'
import { DataTypes } from "sequelize";

dotenv.config()

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull:false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.STRING, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    deviceId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER }
})

const CommentDevice = sequelize.define('comment_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CommentUser = sequelize.define('comment_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Rating)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: "info"})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

Comment.belongsToMany(Device, {through: CommentDevice})
Device.belongsToMany(Comment, {through: CommentDevice})

User.belongsToMany(Comment, {through: CommentUser})
Comment.belongsToMany(User, {through: CommentUser})

export {
    User, Basket, BasketDevice, Device, Type, Brand, Rating, DeviceInfo, TypeBrand, Comment, CommentDevice, CommentUser
}
