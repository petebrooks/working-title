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

  def text_before
    return [] if self.previous_version == nil
    self.previous_version.all_previous_text
  end

  def objects_before
    return [] if self.previous_version == nil
    self.previous_version.all_previous_objects
  end

  def all_previous_text
    return [self.contribution] if self.previous_version == nil
    self.previous_version.all_previous_text + [self.contribution]
  end

  def all_previous_objects
    return [self] if self.previous_version == nil
    self.previous_version.all_previous_objects + [self]
  end

  def calculate_branch_vote_score
    all_previous_objects.map(&:calculate_version_vote_score).reduce(:+)
  end

  def calculate_version_vote_score
    self.votes.where(positive: true).count - self.votes.where(positive: false).count
  end

end
