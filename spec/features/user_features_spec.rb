require 'rails_helper'

describe 'User CRUD pages' do
  before (:each) do
    @user = User.create!(:name => "Name", :email => 'user@example.com', :password => 'password', password_confirmation: "password")
    visit '/signin'
    fill_in 'Email', :with => 'user@example.com'
    fill_in 'Password', :with => 'password'
    click_button 'Sign In'
  end

  describe 'the show page' do
    it 'shows a signed-in user a profile page with links to edit and delete their account' do
      visit user_path(@user)
      expect(page).to have_content ("Edit Profile")
      expect(page).to have_content ("Delete Account")
    end
  end

  describe 'the edit page' do
    it 'should allow a signed-in user to view an edit form with their Name and Email' do
      visit edit_user_path(@user)
      expect(page).to have_selector("input[value='Name']")
    end

    it 'should allow a signed-in user to edit their name' do
      visit edit_user_path(@user)
      fill_in "Name", with: 'Edited Name'
      click_button "Update User"
      expect(page).to have_content ("Edited Name")
    end
  end

end
