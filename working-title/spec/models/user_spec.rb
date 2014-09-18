require 'rails_helper'

describe User do
  describe '#projects' do
    it 'should give an active record assocation of project instances' do
      name = Faker::Name.name
      user = User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
      Project.create!(name: Faker::Lorem.sentence, category_id: rand(1..3), initiator_id: user.id)
      expect(user.projects.all? { |project| project.class == Project }).to eq(true)
    end
  end

  describe '#versions' do
    it 'should give an active record assocation of version instances' do
      name = Faker::Name.name
      user = User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
      Version.create!(insertion_index: -1, previous_version_id: nil, contributor_id: user.id, contribution: Faker::Lorem.sentence)
      expect(user.versions.all? { |version| version.class == Version }).to eq(true)
    end
  end

  describe '#votes' do
    it 'should give an active record assocation of version instances' do
      name = Faker::Name.name
      user = User.create!(name: name, email: Faker::Internet.email(name), password: "password", password_confirmation: "password")
      Vote.create!(user_id: user.id, positive: [true, false].sample)
      expect(user.votes.all? { |vote| vote.class == Vote }).to eq(true)
    end
  end
end
