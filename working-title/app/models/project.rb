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
      max_children = max_array.map { |version| version.children.length }.max
      children_array = max_array.select {|version| version.children.length == max_children }
      if children_array.length == 1
        return children_array.first
      else
        return children_array.max_by { |version| version.created_at }
      end
    end
    nil
  end

end
