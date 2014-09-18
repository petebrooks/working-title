class Version < ActiveRecord::Base
  belongs_to :project
  belongs_to :contributor, class_name: "User"
  belongs_to :previous_version, class_name: "Version"
  has_many :votes, as: :voteable
  has_many :children, class_name: "Version", foreign_key: "previous_version_id"

  before_validation :check_project

  validates :project, presence: true

  def check_project
    self.project ||= self.previous_version.project
  end

  def ancestors_text
    self.ancestors.map(&:contribution)
  end

  def ancestors
    return [] if self.previous_version == nil
    self.previous_version.ancestors + [self.previous_version]
  end

  def branch_text
    self.branch.map(&:contribution)
  end

  def branch
    self.ancestors << self
  end

  def calculate_branch_vote_score
    branch.map(&:calculate_version_vote_score).reduce(:+)
  end

  def calculate_version_vote_score
    self.votes.where(positive: true).count - self.votes.where(positive: false).count
  end

end
