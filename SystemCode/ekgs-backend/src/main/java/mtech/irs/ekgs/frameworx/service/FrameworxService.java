package mtech.irs.ekgs.frameworx.service;

import java.util.List;

import mtech.irs.ekgs.frameworx.model.FrameworxNode;
import mtech.irs.ekgs.frameworx.model.Technology;

public interface FrameworxService {

	Iterable<Technology> findTechnologyAll();
	
	List<FrameworxNode> findNodes(String label);
	
	List<String> findNodeNames(String label);
}
