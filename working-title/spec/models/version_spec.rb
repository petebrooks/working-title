require 'rails_helper'

describe Version do
  before(:each) do
    @user = User.create!(name: "Test User", email: "test@user.com", password: "password", password_confirmation: "password")
    @project = Project.create!(name: "Test Project", initiator: @user)
    @version = Version.create!(contribution: 'testestestest', contributor_id: 1, project: @project)
    @version2 = Version.create!(contribution: 'testestestest', previous_version: @version)
    @version3 = Version.create!(contribution: 'testestestest', previous_version: @version2)
    @version4 = Version.create!(contribution: 'testestestest', previous_version: @version3)
  end

  it 'should have a previous version' do
    expect(@version2).to belong_to(:previous_version)
  end

  it 'should have a contributor' do
    expect(@version2).to belong_to(:contributor)
  end

  it 'should belong to a project' do
    expect(@version2).to belong_to(:project)
  end

  describe '#ancestors' do
    it 'should return an array of versions' do
      expect(@version2.ancestors.first).to be_a(Version)
    end

    it 'should return the correct number of ancestors' do
      expect(@version4.ancestors.length).to eq(3)
    end
  end

  describe '#ancestors_text' do
    it 'should return an array of strings' do
      expect(@version2.ancestors_text.first).to be_a(String)
    end

    it 'should return the correct number of strings' do
      expect(@version4.ancestors_text.length).to eq(3)
    end
  end

  describe '#branch' do
    it 'should return an array of strings' do
      expect(@version2.branch.first).to be_a(Version)
    end

    it 'should return the correct number of strings' do
      expect(@version4.branch.length).to eq(4)
    end
  end

  describe '#branch_text' do
    it 'should return an array of strings' do
      expect(@version2.branch_text.first).to be_a(String)
    end

    it 'should return the correct number of strings' do
      expect(@version4.branch_text.length).to eq(4)
    end
  end
end
