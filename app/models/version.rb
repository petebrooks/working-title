require 'json'

class Version < ActiveRecord::Base
  belongs_to :project
  belongs_to :contributor, class_name: "User"
  belongs_to :previous_version, class_name: "Version"
  has_many :votes, as: :voteable
  has_many :children, class_name: "Version", foreign_key: "previous_version_id"

  before_validation :check_project

  validates :project, presence: true

  after_create :create_vote, :save_initial_score

  def create_vote
    self.votes.create(user: self.contributor, positive: true)
  end

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

  def save_initial_score
    if self.previous_version == nil
      self.initial_vote_score = 0
    else
      self.initial_vote_score = self.previous_version.calculate_branch_vote_score
    end
    self.save
  end

  def calculate_branch_vote_score
    self.initial_vote_score + self.calculate_version_vote_score
  end

  def calculate_version_vote_score
    self.votes.where(positive: true).count - self.votes.where(positive: false).count
  end

  def create_tree_hash
    { id: self.id,
      project_id: self.project.id,
      contribution: self.contribution,
      text: ancestors_text,
      voteScore: calculate_branch_vote_score,
      children: self.children.map(&:create_tree_hash) }
  end

end
