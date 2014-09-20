class Project < ActiveRecord::Base
  attr_accessor :initial_text

  belongs_to :category
  belongs_to :initiator, class_name: "User"
  has_many :votes, as: :voteable
  has_many :versions

  validates :initiator, presence: true
  validate :validate_initial_text

  after_create :create_initial_version

  def get_popular_version
    max_score = self.versions.map(&:calculate_branch_vote_score).max
    max_array = self.versions.select {|version| version.calculate_branch_vote_score == max_score }

    if max_array.length == 1
      return max_array.first
    else
      max_ancestors = max_array.map { |version| version.ancestors.length }.max
      ancestors_array = max_array.select {|version| version.ancestors.length == max_ancestors }
      if ancestors_array.length == 1
        return ancestors_array.first
      else
        return ancestors_array.max_by { |version| version.created_at }
      end
    end
    nil
  end

  def calculate_vote_score
    self.votes.where(positive: true).count - self.votes.where(positive: false).count
  end

  def versions_by(user)
    self.versions.where(contributor: user)
  end

  def validate_initial_text
    errors.add(:initial_text, "can't be blank") unless @initial_text
  end

  def create_initial_version
    self.versions.create!(contribution: @initial_text, contributor: self.initiator, insertion_index: 0)
  end

  def create_tree
    ActiveSupport::JSON.encode(self.versions.first.create_tree_hash)
  end

end
