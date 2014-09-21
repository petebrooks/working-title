class WelcomeController < ApplicationController

  def index
    @projects = Project.all.sample(6).shuffle
  end

end
