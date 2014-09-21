require 'rails_helper'

describe Category do
  before(:each) do
    user = User.create!(name: "Test User", email: "test@user.com", password: "password", password_confirmation: "password")
    @category = Category.create!(name: "story")
    project1 = Project.create!(name: "Test", category_id: 1, initiator_id: 1, initial_text: Faker::Lorem.sentence)
    project2 = Project.create!(name: "Tester", category_id: 1, initiator_id: 1, initial_text: Faker::Lorem.sentence)
    Vote.create!(user_id: 1, voteable_id: project1.id, voteable_type: "Project", positive: true)
    Vote.create!(user_id: 1, voteable_id: project1.id, voteable_type: "Project", positive: true)
    Vote.create!(user_id: 1, voteable_id: project2.id, voteable_type: "Project", positive: true)

  end


  it 'should return projects' do
    expect(@category.projects.first).to be_a(Project)
  end

  describe '#calculate_project_votes' do

    it 'should return an array of projects' do
      expect(@category.calculate_project_votes.last).to be_a(Project)
    end

  end

  describe '#get_top_five_projects' do

   it 'should return an array of projects with the highest voted first' do
      # put @category.calculate_project_votes.first.votes.count
      expect(@category.calculate_project_votes.first.calculate_vote_score).to eq(2)
    end

  end

end
