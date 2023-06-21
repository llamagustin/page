'use strict'

const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT
})

const Blog = sequelize.define("blog", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    img: {
        type: Sequelize.BLOB
    },
    title: {
        type: DataTypes.TEXT,
        defaultValue: ''
    },
    avatar: {
        type: Sequelize.BLOB
    },
    userFullName: {
        type: DataTypes.TEXT,
        defaultValue: ''
    },
    createdTime: {
        type: DataTypes.DATE
    },
    tags: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    content: {
        type: DataTypes.TEXT,
        defaultValue: ''
    },
    comments: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    bookmarked: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    userComment: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    schema: 'aythen',
    tableName: 'blog'
})






module.exports = { Blog }