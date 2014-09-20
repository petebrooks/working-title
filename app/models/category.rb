class Category < ActiveRecord::Base
  has_many :projects


  def calculate_project_votes
    self.projects.sort_by(&:calculate_vote_score).reverse
  end

  def get_top_five_projects
    self.calculate_project_votes.first(5)
  end


end
