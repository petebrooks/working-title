require 'rails_helper'

describe "session features" do
  before :each do
    @user = User.create!(:email => 'user@example.com', :password => 'password', password_confirmation: "password")
  end

  describe "the signin process", :type => :feature do
    it "signs me in" do
      visit '/signin'
      fill_in 'Email', :with => 'user@example.com'
      fill_in 'Password', :with => 'password'
      click_button 'Sign In'
      expect(page).to have_content (@user.name)
    end
  end

  describe "the signup process", :type => :feature do
    it "creates a new user account" do
      visit '/signup'
      fill_in "Name", :with => 'Peggy'
      fill_in "Email", :with => 'peggy@mail.com'
      fill_in "Password", :with => 'password'
      fill_in "Re-type your password", :with => 'password'
      click_button "Create User"
      expect(page).to have_content ("Peggy")
    end
  end

end
