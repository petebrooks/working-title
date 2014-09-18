class Project < ActiveRecord::Base
  belongs_to :category
  belongs_to :initiator, class_name: "User"
  has_many :votes, as: :voteable
  has_many :versions

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

end
