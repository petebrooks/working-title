require 'rails_helper'

describe Project do
  before :each do
    user = User.create(name: Faker::Name.name, email: Faker::Internet.email, password: "password", password_confirmation: "password")
    @project = Project.create!(name: "Test", category_id: 1, initiator_id: 1, initial_text: Faker::Lorem.sentence)
  end

  describe '#get_popular_version' do
    it 'should return a version object' do
      expect(@project.get_popular_version).to be_kind_of(Version)
    end

    context 'winning logic' do
      before :each do
    @version_two = Version.create!(project_id: @project.id, contributor_id: 1, previous_version_id: nil, contribution: "Test Content 1", insertion_index: -1)
    Vote.create!(user_id: 1, voteable_id: @version_two.id, voteable_type: "Version", positive: true)
        @version_three = Version.create!(project_id: @project.id, contributor_id: 1, previous_version_id: @version_two.id, contribution: "Test Content 2", insertion_index: -1)
        Vote.create!(user_id: 1, voteable_id: @version_three.id, voteable_type: "Version", positive: true)
        Vote.create!(user_id: 2, voteable_id: @version_three.id, voteable_type: "Version", positive: true)
      end

      it 'should return the version with the most votes' do
        expect(@project.get_popular_version).to eq(@version_three)
      end

      it 'should return the version with the longer branch when the votes are tied' do
        version_three = Version.create!(project_id: @project.id, contributor_id: 1, previous_version_id: @version_three.id, contribution: "Test Content 3", insertion_index: -1)
        expect(@project.get_popular_version).to eq(version_three)
      end

      it 'should return the most recent version when the votes and branch length are tied' do
        version_three = Version.create!(project_id: @project.id, contributor_id: 1, previous_version_id: @version_three.id, contribution: "Test Content 3", insertion_index: -1)
        sleep(1)
        version_four = Version.create!(project_id: @project.id, contributor_id: 1, previous_version_id: @version_three.id, contribution: "Test Content 3", insertion_index: -1)
        expect(@project.get_popular_version).to eq(version_four)
      end
    end
  end

  describe 'initialize' do
    it 'should require an initial text' do
      invalid_project = Project.new(name: "Test", category_id: 1, initiator_id: 1)
      expect(invalid_project).to be_invalid
    end
  end

  describe 'initial version' do
    it 'should be created with project' do
      expect(@project.versions.count).to eq(1)
    end

    it 'should contain the correct text' do
      expect(@project.versions.first.contribution).to eq (@project.initial_text)
    end
  end
end
