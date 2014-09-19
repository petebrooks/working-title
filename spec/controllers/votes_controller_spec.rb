require 'rails_helper'

describe VotesController do
	before :each do
		name = Faker::Name.name
		@user = User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
		session[:user_id] = @user.id
		@project = Project.create!(name: "Test", initial_text: "Test content", category_id: 1, initiator_id: 1)
		@version = @project.versions.first
	end
	describe '#create' do
		it 'should create a new vote object' do
			voteable_id = @version.id
			voteable_type = "Version"
			positive = true
			vote = {voteable_id: voteable_id, voteable_type: voteable_type, positive: positive}
			expect{post :create, {vote: vote}}.to change{Vote.all.count}.by(1)
		end

		it 'should redirect if request is made by html' do
			voteable_id = @version.id
			voteable_type = "Version"
			positive = true
			vote = {voteable_id: voteable_id, voteable_type: voteable_type, positive: positive}
			post :create, {vote: vote}
			expect(response.status).to eq 302
		end

		it 'should render json if request is made by javascript' do
			voteable_id = @version.id
			voteable_type = "Version"
			positive = true
			vote = {voteable_id: voteable_id, voteable_type: voteable_type, positive: positive}
			post :create, {vote: vote, format:'js'}
			expect(response.body).to eq(1.to_json)
		end
	end
end
