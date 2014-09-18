require 'rails_helper'

describe Version do
  before(:each) do
    @user = User.create!(name: "Test User", email: "test@user.com", password: "password", password_confirmation: "password")
    @project = Project.create!(name: "Test Project", initiator: @user)
    @version = Version.create!(contribution: 'testestestest', contributor_id: 1, project: @project)
    @version2 = Version.create!(contribution: 'testestestest', previous_version: @version)
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
end
