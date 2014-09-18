require 'rails_helper'

describe SessionsController do
  describe '#new' do
    it 'should render the new users page' do
      get :new
      expect(response.status).to eq 200
    end
  end

  describe '#create' do
    it 'should redirect the page if a user is signed in' do
      name = "Test"
      email = "test@test.com"
      password = "password"
      user = User.create!(name: name, email: email, password: password, password_confirmation: password)
      post :create, {email: email, password: password}

      expect(response.status).to eq 302
    end

    it 'should render new if there are errors' do
      name = "Test"
      email = "test@test.com"
      password = "password"
      user = User.create!(name: name, email: email, password: password, password_confirmation: password)
      post :create, {email: email, password: "blah"}

      expect(response.status).to eq 200
    end
  end
end
