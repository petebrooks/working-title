class AddVoteScoreToVersions < ActiveRecord::Migration
  def change
    add_column :versions, :initial_vote_score, :integer
  end
end
