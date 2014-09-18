class Project < ActiveRecord::Base
  belongs_to :category
  belongs_to :initiator, class_name: "User"
  has_many :votes, as: :voteable
  has_many :versions

   # find project
  # find project's versions
  # get vote score for each project version
  # return version with highest vote score

  def get_popular_version
    self.versions.map(&:calculate_branch_vote_score).max

    version_vote_scores = self.versions.map(&:calculate_branch_vote_score)
  end

end
