require 'rails_helper'

describe UsersController do
  describe '#new' do
    it 'should render the new users page' do
      get :new
      expect(response.status).to eq 200
    end
  end

  describe '#create' do
    it 'should add a user to the database' do
      name = Faker::Name.name
      email = Faker::Internet.email(name)
      user = {name: name, email: email, password: "password", password_confirmation: "password"}
      expect{post :create, {user: user}}.to change{User.all.count}.by(1)
    end
  end

  describe '#show' do
    it 'should render the show user page' do
      name = Faker::Name.name
      user = User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
      get :show, {id: user.id}
      expect(response.status).to eq 200
    end
  end

  describe '#update' do
    it 'should update a user in the database' do
      name = "Test"
      email = "test@email.com"
      user = User.create!(name: name, email: email, password: "password", password_confirmation: "password")
      user_params = {name: "Updated", email: email}
      expect{patch :update, {id: user.id, user: user_params}}.to change{User.find(user.id).name}.from("Test").to("Updated")
    end
  end

  describe '#edit' do
    it 'should render the edit users page' do
      name = Faker::Name.name
      user = User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
      get :edit, {id: user.id}
      expect(response.status).to eq 200
    end
  end

  describe '#destroy' do
    it 'should delete a user in the database' do
      name = "Test"
      email = "test@email.com"
      user = User.create!(name: name, email: email, password: "password", password_confirmation: "password")
      expect{delete :destroy, {id: user.id}}.to change{User.all.count}.by(-1)
    end
  end
end
